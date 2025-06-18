export const sendData = async (name, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://localhost:7240/api/Values/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, password }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                resolve(result);
            } catch (error) {
                reject(error.message);
            }
        }, 3000);
    });
};