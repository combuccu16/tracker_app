export async function changeName(newName) {
  try {
    const response = await fetch('http://localhost:5000/api/settings/changeName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       credentials: "include", 
      body: JSON.stringify({ newName })
    });

    const data = await response.json();
    return data; // { message: "...", error: "..." } if any
  } catch (err) {
    console.error('Error changing name:', err);
    return { message: 'Something went wrong. Try again.' };
  }
}

export async function changeLastName(newLastName) {
  try {
    const response = await fetch('http://localhost:5000/api/settings/changeLastname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       credentials: "include",
      body: JSON.stringify({ newLastName })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error changing last name:', err);
    return { message: 'Something went wrong. Try again.' };
  }
}

export async function changePassword(currentPassword, newPassword) {
  try {
    const response = await fetch('http://localhost:5000/api/settings/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error changing password:', err);
    return { message: 'Something went wrong. Try again.' };
  }
}
