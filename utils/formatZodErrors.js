const {ZodError} = require("zod")

function formatZodErrors(error) {
  if (!(error instanceof ZodError)) {
    return [];
  }

  return error.issues.map((issue) => ({ texto: issue.message }));
}

module.exports = formatZodErrors