let ppu = document.querySelectorAll(".ppu");
let units = document.querySelectorAll(".units");
let row = document.querySelectorAll(".line-item");
let totalEl = document.querySelectorAll(".total");
let invoiceTotal = document.querySelector(".invoice-total");
let lineTotal;
let totalArray = [];

let archiveBtn = document.querySelector(".archiveBtn");
let unarchiveBtn = document.querySelector(".unarchiveBtn");

let deleteBtn = document.querySelector(".delete-item-btn");
let paidBtn = document.querySelector(".paidBtn");
let unpaidBtn = document.querySelector(".unpaidBtn");

let paidBadge = document.querySelector("#paid");
let unpaidBadge = document.querySelector("#unpaid");

function getTotal() {
    // get each line total
    for (var i = 0; i < row.length; i++) {
        lineTotal = ppu[i].innerHTML * units[i].innerHTML;
        totalEl[i].append(lineTotal);
        console.log("Line Total: ", lineTotal);
        // push to array of line totals for addition of invoice total
        totalArray.push(lineTotal);
    }
    // add all line totals and append to invoice
    totalSum = totalArray.reduce((a, b) => a + b, 0);
    invoiceTotal.append(totalSum);
    console.log("Invoice Total: ", totalSum);
}
async function deleteItem(itemId) {
    console.log("item id: ", itemId);
    const response = await fetch(`/api/item/${itemId}`, {
        method: "DELETE",
        body: JSON.stringify({
            itemId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        // document.location.replace(`/dashboard/invoice/${invoice_id}`);
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
async function markArchived(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/invoice/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            archived: true,
        }),

        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        alert("Successfully archived invoice!");
        window.location.replace("/archived");

    } else {
        alert(response.statusText);
    }
}
async function markUnarchived(event) {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/invoice/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            archived: false,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        alert("Successfully restored invoice!");
        window.location.replace(`/dashboard/invoice/${id}`);

    } else {
        alert(response.statusText);
    }
}

async function markPaid(event) {
    event.preventDefault();


    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/invoice/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            isPaid: true,
        }),

        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.reload();
        alert("invoice marked as paid");

    } else {
        alert(response.statusText);
    }

}
async function markUnpaid(event) {
    event.preventDefault();


    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/api/invoice/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            isPaid: false,
        }),

        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        alert("invoice marked as unpaid");
        document.location.reload();

    } else {
        alert(response.statusText);
    }

}


getTotal();

archiveBtn.addEventListener("click", markArchived);
unarchiveBtn.addEventListener("click", markUnarchived);
paidBtn.addEventListener("click", markPaid);
unpaidBtn.addEventListener("click", markUnpaid);

document.querySelector("#invoice-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-item-btn")) {
        event.preventDefault();
        let itemId = event.target.getAttribute("data-item-id");
        deleteItem(itemId);
    }
});
