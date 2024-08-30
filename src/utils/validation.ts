import { MeasureType, PrismaClient } from '@prisma/client';
import { CustomError } from './customError';

const prisma = new PrismaClient();

export function isUUID(id: string): void {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(id)) {
    throw new CustomError(
      400,
      'INVALID_DATA',
      'O código do cliente fornecido não é um UUID válido.',
    );
  }
}

export async function validateMonth(id: string, inputDate: Date) {
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();

  const existingMeasurement = await prisma.measure.findFirst({
    where: {
      customer_code: id,
      measure_datetime: {
        gte: new Date(year, month - 1, 1), // Início do mês
        lt: new Date(year, month, 1), // Início do próximo mês
      },
    },
  });

  if (existingMeasurement) {
    throw new CustomError(
      409,
      'DOUBLE_REPORT',
      'O ID já possui uma medida para o mês e ano especificados.',
    );
  }
}

export function isBase64(image: string): void {
  // Regex para validar se a string é uma imagem Base64
  const base64ImageRegex =
    /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/;

  if (!base64ImageRegex.test(image)) {
    throw new CustomError(
      400,
      'INVALID_DATA',
      'A string fornecida não é uma imagem Base64 válida.',
    );
  }
}

export function validateType(type: string): void {
  const measureTypeValues = Object.values(MeasureType);

  if (!measureTypeValues.includes(type as MeasureType)) {
    throw new CustomError(
      400,
      'INVALID_DATA',
      'O tipo de medida fornecido não é válido.',
    );
  }
}

export function isMeter(value: string): void {
  const num = Number(value);
  if (!isNaN(num) && isFinite(num)) {
    throw new CustomError(
      400,
      'INVALID_DATA',
      'Por favor, forneça a imagem de um medidor da gás ou água válido.',
    );
  }
}
