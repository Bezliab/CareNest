// /src/services/smsService.js
export const sendSMS = async (phoneNumber, message) => {
  await fetch('https://your-backend-url/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: phoneNumber, message }),
  });
};
