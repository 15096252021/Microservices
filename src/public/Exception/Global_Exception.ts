export function Global_ErrorHandler(err: any, vm: any, info: any) {
  console.error('Error:', err);
  console.error('Vue instance:', vm);
  console.error('Error info:', info);
}
