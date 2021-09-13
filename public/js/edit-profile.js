async function profileFormHandler(event) {
    event.preventDefault();

    const companyName = document.querySelector('input[name="company-name"]').value.trim();

    const address1 = document.querySelector('input[name="profile-address-1"]').value.trim();
    const address2 = document.querySelector('input[name="profile-address-2"]').value.trim();
    const city = document.querySelector('input[name="profile-city"]').value.trim();
    const state = document.querySelector('input[name="profile-state"]').value.trim();
    const zipCode = document.querySelector('input[name="profile-zip-code"]').value.trim();

    const logoURL = []


    const response = await fetch(`/api/profile/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            companyName,
            address1,
            address2,
            city,
            state,
            zipCode,
            logoURL


        }),

        headers: {
            'Content-Type': 'application/json'
        }
    });



    if (response.ok) {
        document.location.replace(`/profile/${id}`);
    } else {
        alert(response.statusText);
    }

}


document.querySelector('.edit-profile-form').addEventListener('submit', profileFormHandler);