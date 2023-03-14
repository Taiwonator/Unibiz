export const isProduction = () =>
  'production' === process.env.NEXT_PUBLIC_NODE_ENV;
