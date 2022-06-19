import axios from "axios";

export const handle = async () => {
  try {
    const {
      data: { value },
    } = await axios.get('https://api.countapi.xyz/get/rafaelbispo/stone-serverless-app');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Accesses recorded so far: ${value}`,
          accesses: value
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};