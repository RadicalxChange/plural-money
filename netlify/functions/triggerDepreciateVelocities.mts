import { Handler, schedule } from '@netlify/functions';
import axios from 'axios';

const functionHandler: Handler = async (event, context) => {
  console.log("Running scheduled function for depreciating velocity");

  try {
    const response = await axios.get(process.env.AUTH0_BASE_URL + '/api/depreciateVelocities', {
      params: {
        secret: process.env.NETLIFY_SECRET || '',
      }
    });
    
    if (response.status === 200) {
      console.log(response.data.message)
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: response.data.message })
      }
    } else {
      console.log(`Failed with status code ${response.status}: ${response.data.error}`)
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.data.error })
      }
    }
  } catch (error) {
    console.log("Error calling API: ", error)
    return {
      statusCode: 500,
      body: JSON.stringify("Error calling API: ", error)
    }
  }
}

export const handler = schedule("@daily", functionHandler);