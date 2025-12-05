// Reusable function for reporting errors. (This will be useful for when we wanna replace ErrorService with an ACTUAL error service that can notify us of errors occuring)
export const ErrorService = {
  captureException: (error, context) => {
    console.error('Logged:', error);
    console.table(context);
  }
};