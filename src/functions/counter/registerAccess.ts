import axios from "axios";

export const handle = async () => {
  try {
    await axios.get('https://api.countapi.xyz/hit/rafaelbispo/stone-serverless-app');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Registered access!",
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