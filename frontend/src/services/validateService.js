async function checkEmail(email) {
  try {
    const res = await fetch('/checkEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: "include",
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error checking email:', err);
    return { valid: false, msg: 'Something went wrong. Please try again.' };
  }
}

async function checkPassword(password) {
  try {
    const res = await fetch('/checkPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: "include",
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error checking password:', err);
    return { valid: false, msg: 'Something went wrong. Please try again.' };
  }
}

async function checkName(name) {
  try {
    const res = await fetch('/checkname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: "include",
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error checking name:', err);
    return { valid: false, msg: 'Something went wrong. Please try again.' };
  }
}

async function checkLastName(lastname) {
  try {
    const res = await fetch('/checklastname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: "include",
      body: JSON.stringify({ lastname })
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error checking lastname:', err);
    return { valid: false, msg: 'Something went wrong. Please try again.' };
  }
}
module.exports = {
    checkEmail , 
    checkLastName , 
    checkName,
    checkPassword
}