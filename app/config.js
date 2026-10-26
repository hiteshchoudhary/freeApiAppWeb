// The live FreeAPI server. Override with NEXT_PUBLIC_API_URL (no trailing slash) to point the site elsewhere.
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://prod-main-api-704464-00tre1p1erm.compute.instacloud-edge.com"
).replace(/\/+$/, "");

export const API_BASE_URL = `${API_URL}/api/v1`;
export const API_HOST = new URL(API_URL).host;

export const DOCS_URL = "/docs";
export const REPO_URL = "https://github.com/hiteshchoudhary/apihub";
export const SPEC_URL =
  "https://raw.githubusercontent.com/hiteshchoudhary/apihub/main/src/swagger.yaml";
