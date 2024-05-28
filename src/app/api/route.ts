
import { NextResponse } from 'next/server';
import connectToDatabase from 'app/services/mongo/mongo';
import Payment from 'app/services/mongo/payment';

export async function GET() {
  try {
    await connectToDatabase();

    // Aquí deberías obtener el userId del contexto de autenticación
    const userId = ''; // Reemplaza esto con el método adecuado para obtener el userId

    const payments = await Payment.find({ userId });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}