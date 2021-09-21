import { Configuration, V0alpha1Api } from '@ory/kratos-client'
import instance from './axios'

export const ory = new V0alpha1Api(
  new Configuration({
    // This points to the Ory Proxy
    basePath: 'http://localhost:4433'
  }),
  'http://localhost:4433',
  instance
)
