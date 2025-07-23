export const extractYtDlpError = (message: string): string => {
  const errorLines = message.split('\n');
  const errorLine = errorLines.find(line => line.trim().startsWith('ERROR:'));
  return errorLine ? errorLine.replace('ERROR:', '').trim() : 'An unknown error occurred.';
};
