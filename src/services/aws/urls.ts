import { env } from "app/config/env"

export const paymentUrls = {

  payments:{
    'all': `${env.AWS_HOSTNAME}/v1/stats`,
  },

}