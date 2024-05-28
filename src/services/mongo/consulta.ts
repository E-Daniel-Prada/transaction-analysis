
import connectToDatabase from 'app/services/mongo/mongo';
import Payment from 'app/services/mongo/payment';

export const getPayments = async (userId?: string) => {
  try {
    await connectToDatabase();

    
    const query = userId ? { userId } : {};
    
    
    const payments = await Payment.find(query);

    
    const transformedPayments = payments.map((payment: any) => {
      return {
        new_primary_id: payment._id,
        userId: payment.secondary_id,
        amount: payment.amount,
        date: payment.dateCreatedPay,
      };
    });

    return transformedPayments;
  } catch (error) {
    console.error(error);
    return [];
  }
};
