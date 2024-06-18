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

    const memecoin = await Memecoin.findById(memecoinId);
    if (!memecoin) {
      return new Response(JSON.stringify({ error: 'Memecoin not found' }), {
        status: 404,
      });
    }

    let results = [];
    let minDate;
    let maxDate;

    const range = await Transaction.aggregate([
      {
        $match: {
          memecoin_id: memecoinId
        }
      },
      {
        $group: {
          _id: null,
          minDate: { $min: "$timestamp" },
          maxDate: { $max: "$timestamp" }
        }
      }
    ])

    if (range.length > 0) {
      console.log('Range:', range);
      minDate = range[0].minDate;
      maxDate = range[0].maxDate;
    } else {
      results.push({
        open: 1,
        high: 1,
        low: 1,
        close: 1,
        time: Math.floor(memecoin.timestamp.getTime() / 1000)
      });

      console.log('Results:', results);

      return new Response(JSON.stringify({ results }), { 
        status: 200
      });
    }

    results = await Transaction.aggregate([
      {
        $match: {
          memecoin_id: memecoinId,
          timestamp: { $gte: minDate, $lte: maxDate }
        }
      },
      {
        $sort: { timestamp: 1 }
      },
      {
        $group: {
          _id: {
            $dateTrunc: {
              date: "$timestamp",
              unit: "minute",
              binSize: 5
            }
          },
          open: { $first: "$price_per_token_start" },
          high: { $max: { $max: ["$price_per_token_start", "$price_per_token_end"] } },
          low: { $min: { $min: ["$price_per_token_start", "$price_per_token_end"] } },
          close: { $last: "$price_per_token_end" }
        }
      },
      {
        $project: {
          _id: 0,
          time: {
            $divide: [
              { $subtract: [
                { $toLong: "$_id" },
                { $toLong: new Date("1970-01-01T00:00:00Z") }
              ]},
              1000
            ]
          },
          open: 1,
          high: 1,
          low: 1,
          close: 1
        }
      },
      {
        $sort: { time: 1 }
      }
    ])
    
    if (results.length > 1) {
      for (let i = 1; i < results.length; i++) {
        results[i].open = results[i - 1].close;
      }
    }

    console.log('Results:', results);

    return new Response(JSON.stringify({ results }), { 
      status: 200
    });

  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch transactions', { status: 500 });
  }
};
