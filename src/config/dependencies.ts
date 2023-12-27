import { type IdentityService, identityService } from "../lib/identityaccess/application/index.js";

const identity = identityService()

type Dependencies = {
  identity: IdentityService, // interface type
  handleSignup: IdentityService["handleSignup"],
  handleSignIn: IdentityService["handleSignIn"]
}

export default {
  identity, // Concrete implementation from the factory
  handleSignup: identity.handleSignup.bind(identity),
  handleSignIn: identity.handleSignIn.bind(identity)
} satisfies Dependencies