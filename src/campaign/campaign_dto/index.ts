export class CreateCampaignDto {
  name: string;
  brandId: number;
  isActive: boolean;
  activeHours: number[]; // Array of hours [e.g. 9, 10, 11] for 9 AM to 11 AM
}

export class UpdateCampaignDto {
  isActive?: boolean;
  activeHours?: number[]; // Optional: Update the active hours
}
