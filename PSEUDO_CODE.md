# Ad Campaign Management System

## Project Overview

This system is designed to manage advertising campaigns for multiple brands. Each brand has a daily and monthly budget, and campaigns within each brand should be activated or deactivated based on these budgets. Additionally, campaigns may only run during specific times of the day (dayparting). The system will handle the activation and deactivation of campaigns based on the current day, time, and budget status.

### Key Features:

1. **Brand and Campaign Management**: Create brands, create campaigns for brands, and manage their statuses.
2. **Budget Management**: Monitor and update daily and monthly spends for brands, turn campaigns off once budgets are exceeded.
3. **Dayparting**: Campaigns only run during specified hours.
4. **Automatic Reset**: Reset daily and monthly budgets at the start of a new day/month.
5. **Cron Jobs**: Automate checks and updates for dayparting and budget statuses.

---

## Data Structures

### 1. **Brand**

- `id`: Unique identifier for the brand.
- `name`: Name of the brand.
- `dailyBudget`: The total amount a brand can spend per day.
- `monthlyBudget`: The total amount a brand can spend per month.
- `dailySpend`: The total amount a brand has spent today.
- `monthlySpend`: The total amount a brand has spent this month.
- `lastReset`: Timestamp for the last reset of daily/monthly budgets.
- `campaigns`: List of campaigns associated with the brand.

### 2. **Campaign**

- `id`: Unique identifier for the campaign.
- `name`: Name of the campaign.
- `isActive`: Status indicating whether the campaign is active or not.
- `activeHours`: Array of hours (e.g., [9, 10, 11]) during which the campaign can be active.
- `brand`: Reference to the `Brand` that owns the campaign.

---

## Key Steps for Management

### 1. **Managing Budgets**

#### a. **Daily Spend Check**

- **When an ad campaign is triggered**: Each time a campaign incurs a cost, update the daily spend of the associated brand.
- **Compare the daily spend** with the `dailyBudget`:
  - If `dailySpend >= dailyBudget`: Turn off all campaigns for the day.

#### b. **Monthly Spend Check**

- **When a new campaign cost is added**: Update the `monthlySpend` for the associated brand.
- **Compare the monthly spend** with the `monthlyBudget`:
  - If `monthlySpend >= monthlyBudget`: Turn off all campaigns for the month.

#### c. **Reset Budgets**

- **At the start of each day**: Reset the `dailySpend` to 0 and check if the campaigns should be reactivated based on the brand's `dailyBudget`.
- **At the start of each month**: Reset the `monthlySpend` to 0 and check if the campaigns should be reactivated based on the brand's `monthlyBudget`.

---

### 2. **Turning Campaigns On/Off**

- **Turning campaigns off**:
  - **Daily budget exceeded**: If a brand's daily spend exceeds or equals its daily budget, all campaigns for that brand are deactivated.
  - **Monthly budget exceeded**: If a brand's monthly spend exceeds or equals its monthly budget, all campaigns for that brand are deactivated.
- **Turning campaigns on**:
  - **If within budget**: At the start of a new day or month, campaigns are reactivated if the brand has not exceeded its budget for that period.
- **Campaign Dayparting Check**:
  - For each campaign, check if the current time (hour) falls within the `activeHours` range.
  - If the current time is within the specified active hours, the campaign is activated; otherwise, it is deactivated.

---

### 3. **Dayparting (Time-based Activation)**

- For each campaign, store the `activeHours` array which specifies the hours during which the campaign should be active.
  - Example: `[9, 10, 11]` means the campaign runs between 9 AM and 11 AM.
- Every hour (via cron job), check:
  - **Is the current time (hour) within `activeHours`**?
    - If yes, activate the campaign.
    - If no, deactivate the campaign.
- **Automated Dayparting Check**: A cron job runs hourly to ensure campaigns are activated or deactivated based on the specified `activeHours`.

---

### 4. **Automatic Reset of Budgets**

- **Daily Reset**:
  - **At midnight**, reset the `dailySpend` to `0` for all brands.
  - Check if the brand's `dailySpend` is within its `dailyBudget`. Reactivate campaigns if necessary.
- **Monthly Reset**:

  - **At the start of a new month**, reset the `monthlySpend` to `0` for all brands.
  - Check if the brand's `monthlySpend` is within its `monthlyBudget`. Reactivate campaigns if necessary.

- **Implement Cron Jobs**:
  - **Daily Reset Cron**: Runs at midnight and resets the daily spends for all brands.
  - **Monthly Reset Cron**: Runs at the start of each month and resets the monthly spends for all brands.

---

## Cron Jobs

### 1. **Dayparting Check (Hourly)**:

- Runs every hour to check if campaigns should be activated or deactivated based on the current hour and their `activeHours`.

### 2. **Daily Reset**:

- Runs every midnight to reset the `dailySpend` for all brands and recheck the campaigns based on their budgets.

### 3. **Monthly Reset**:

- Runs at the start of each month to reset the `monthlySpend` for all brands and recheck the campaigns based on their budgets.

---

## Pseudocode for Cron Jobs

### 1. **Daily Reset Job**

```pseudo
function dailyReset():
    for each brand in allBrands:
        reset dailySpend to 0
        check if dailySpend < dailyBudget
        if yes, activate campaigns
        else, deactivate campaigns
```

### 2. **Monthly Reset Job**

```pseudo
function monthlyReset():
    for each brand in allBrands:
        reset monthlySpend to 0
        check if monthlySpend < monthlyBudget
        if yes, activate campaigns
        else, deactivate campaigns
```

### 3. **Dayparting Check (Hourly)**

```pseudo
function checkDayparting():
    currentHour = getCurrentHour()
    for each campaign in allCampaigns:
        if currentHour in campaign.activeHours:
            if campaign.isActive is false:
                activate campaign
        else:
            if campaign.isActive is true:
                deactivate campaign
```

---

## Conclusion

This system ensures that campaigns are automatically managed based on the brand’s daily and monthly budget limits, as well as specific time-based dayparting rules. The use of cron jobs allows for automation of dayparting checks and budget resets, reducing the need for manual intervention. This approach ensures campaigns run efficiently and are compliant with the specified budget constraints.
