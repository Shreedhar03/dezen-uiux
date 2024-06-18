import { connectToDB } from '@/utils/database';
import mongoose from 'mongoose';
import Transaction from '@/models/transaction';
import Memecoin from '@/models/memecoin';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(params.memecoin_id)) {
      return new Response(JSON.stringify({ error: 'Invalid memecoin id' }), {
        status: 400,
      });
    }

    const memecoinId = new mongoose.Types.ObjectId(params.memecoin_id);

    const transactions = await Transaction.find({ memecoin_address: memecoinId });

    return new Response(JSON.stringify(transactions), { 
      status: 200
    });

  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch transactions', { status: 500 });
  }
};
