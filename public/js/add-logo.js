


async function addLogoHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const type = document.querySelector('input[name="type"]').value.trim();
    const price = document.querySelector('input[name="price"]').value.trim();
    const dueDate = document.querySelector('input[name="due-date"]').value.trim();

    const company_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    if (title) {
        const response = await fetch("/api/project", {
            method: "POST",
            body: JSON.stringify({
                title,
                type,
                price,
                dueDate,
                company_id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace(`/dashboard/company/${company_id}`);

        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector("#add-logo-form")
    .addEventListener("submit", addLogoHandler);
