type EmailAddress = string & {readonly __brand: unique symbol}
const isEmailAddress = (s: unknown): s is EmailAddress => true

export const fromString = (s: string): EmailAddress => {
  if (isEmailAddress(s)) return s
  throw new TypeError("email is not valid")
}