import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeasure, MeasureResponse } from './types';
import {
  getImageURL,
  hasData,
  isBase64,
  isUUID,
  validateMonth,
  validateType,
} from './utils/validation';
import { textGenMultimodalOneImagePrompt } from './utils/gemini';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createMeasure(data: CreateMeasure): Promise<MeasureResponse> {
    hasData(data);
    // isBase64(data.image);
    isUUID(data.customer_code);

    const insertDate = new Date(data.measure_datetime);

    validateMonth(data.customer_code, data.measure_type, insertDate);
    validateType(data.measure_type);

    const base64Image = data.image;
    const mimeType = 'image/jpeg'; // Tipo MIME da imagem
    const prompt = 'What is the measure from the meter?, only numbers'; // Prompt para o modelo

    const geminiResult = await textGenMultimodalOneImagePrompt(
      base64Image,
      mimeType,
      prompt,
    );
    // isMeter(await geminiResult);
    // const numberResult = Number(geminiResult);

    // Verifica se o customer_code já existe
    let customer = await this.prisma.customer.findUnique({
      where: { customer_code: data.customer_code },
    });

    // Se o cliente não existir, cria um novo cliente
    if (!customer) {
      customer = await this.prisma.customer.create({
        data: { customer_code: data.customer_code },
      });
    }

    // Adiciona a nova medida à tabela `measure`
    const measure = await this.prisma.measure.create({
      data: {
        measure_value: Number(geminiResult),
        measure_datetime: data.measure_datetime,
        measure_type: data.measure_type,
        has_confirmed: false,
        image_url: getImageURL(data.image),
        customer: {
          connect: { customer_code: data.customer_code }, // Associa a medida ao cliente
        },
      },
      select: {
        image_url: true,
        measure_value: true,
        measure_uuid: true, // Certifique-se de que este campo existe na tabela
      },
    });

    return measure;
  }
}

// async function findCustomer(customer_id: string) {
//   constructor(private prisma: PrismaService) {}

//   // Verifica se o customer_code já existe
//   let customer = await this.prisma.customer.findUnique({
//     where: { customer_code: customer_id },
//   });

//   // Se o cliente não existir, cria um novo cliente
//   if (!customer) {
//     customer = await this.prisma.customer.create({
//       data: { customer_code: customer_id },
//     });
//   }
// }
