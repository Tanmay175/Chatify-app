export const emailTemplate = (name, appLink) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height:1.6">
    <h2>Welcome to Chatify, ${name}! 🎉</h2>

    <p>Your account is ready. Let's get started:</p>

    <ul>
      <li>Set up your profile</li>
      <li>Find friends</li>
      <li>Start conversations</li>
    </ul>

    <a href="${appLink}" 
      style="
        display:inline-block;
        padding:10px 18px;
        background:#4f46e5;
        color:white;
        text-decoration:none;
        border-radius:5px;
      ">
      Open Chatify
    </a>

    <p>If button does not work:</p>
    <p>${appLink}</p>

    <br/>
    <p>Team Chatify</p>
  </div>
  `;
};