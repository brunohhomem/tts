import { MeasureType } from '@prisma/client';

export interface MeasureProps {
  measure_uuid: string;
  measure_value: number;
  measure_unit: string;
  measure_datetime: Date;
  measure_type: MeasureType; // Enum: "WATER" ou "GAS"
  has_confirmed: boolean;
  image_url: string;
  customer_code: string;
}

export interface CreateMeasure {
  // image: string | File;
  image?: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType; // Enum: "WATER" ou "GAS"
}

export interface MeasureResponse {
  measure_uuid: string;
  measure_value: number;
  image_url: string;
}

export interface ConfirmMeasure {
  measure_uuid: string;
  confirmed_value: number;
}

export interface CustomerProps {
  customer_code: string;
  measures: [];
}
