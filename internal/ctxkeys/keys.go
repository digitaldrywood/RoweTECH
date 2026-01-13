package ctxkeys

type siteConfigKey struct{}
type userKey struct{}
type clerkConfigKey struct{}

var SiteConfig = siteConfigKey{}
var User = userKey{}
var ClerkConfig = clerkConfigKey{}
