/* jshint esversion: 6 */

const itemsPerPage = 10;
const listOfItems = document.querySelectorAll('.student-item');

showPage(listOfItems, 1);
appendPagination(listOfItems);

//this function determines the current oage items to be displayed
function showPage (list, pageNumber) {
	
	'use strict';
	let startIndex = (pageNumber * itemsPerPage) - itemsPerPage;
	const endIndex = pageNumber * itemsPerPage;
	
	for (let x = 0; x < list.length; x++) {
		for (let t = 0; t < listOfItems.length; t++) {
			if (list[x] === listOfItems[t]) {
				listOfItems[t].style.display = 'block';
			} else {
				listOfItems[t].style.display = 'none';
			}
		}
	}
		
	for (let i = 0; i < list.length; i++) {
		
		if (i < endIndex && i >= startIndex) {
			list[i].style.display = 'block';
		} else {
			list[i].style.display = 'none';
		}
		
	}
	
}

//this function dynamically builds and adds the buttins to change the page of items
function appendPagination (list) {
	
	'use strict';
	
	if (document.querySelector('.pagination')) {
		document.querySelector('.pagination').remove();
	}
	
	let pageLinkCount = Math.ceil(list.length / itemsPerPage);
	if (pageLinkCount === 0) {
		pageLinkCount = 1;
	}
	
	const div = document.createElement('div');
	div.classList.add('pagination');
	
	document.querySelector('.page').append(div);
	
	let html = `<ul>`;
	for (let i = 1; i <= pageLinkCount; i++) {
		if (i === 1) {
			html += `<li>
						<a class="active" href="#">${i}</a>
					</li>`;
		} else {
			html += `<li>
						<a href="#">${i}</a>
					</li>`;
		}
		
	}
	
	html += `</ul>
			</div>`;
	
	div.innerHTML = html;
	
	showPage(list, 1);
	
	const paginationLinkList = document.querySelector('.pagination').firstElementChild;
	
	paginationLinkList.addEventListener('click', event => {
		if (event.target.tagName === 'A') {
			
			const paginationLinks = paginationLinkList.children;
			let pageNumber;
			
			for (let x = 0; x < paginationLinks.length; x++) {
				if (paginationLinks[x].firstElementChild.classList.contains('active')) {
					paginationLinks[x].firstElementChild.classList.remove('active');
				}
				const pageChecker = x + 1;
				if (pageChecker.toString() === event.target.textContent && !paginationLinks[x].firstElementChild.classList.contains('active')) {
					paginationLinks[x].firstElementChild.classList.add('active');
					pageNumber = pageChecker;
				}
			}
			showPage(list, pageNumber);
		}													   
	});
	
}

/*******************
SEARCH BAR
*******************/
let searchInput; 
let searchMatched = true; //Used to control if a user shows up in the search results
buildSearchBar();
function buildSearchBar () {
	'use strict';
	const html = `<div class="student-search">
					<input placeholder="Search for students...">
					<button>Search</button>
				</div>`;
	document.querySelector('.page-header').innerHTML += html;
	
	searchInput = document.querySelector('input');
	searchInput.addEventListener('keyup', search);
	document.querySelector('button').addEventListener('click', search);
}

function search () {
	
	'use strict';
	const searchValue = searchInput.value;
	const nameArray = [];
	
	if (searchValue !== '' && searchValue !== null) {
		
		const names = document.querySelectorAll('H3');

		for(let i = 0; i < searchValue.length; i++) {
			for(let x = 0; x < names.length; x++) {
				if (searchValue[i] === names[x].textContent[i]) {
					searchMatched = true;
				} else {
					searchMatched = false;
				}
				if (searchMatched) {
					nameArray.push(listOfItems[x]);
				}
			}
		}
		
		if (nameArray === undefined || nameArray.length === 0) {
			noResults();
		} else {
			appendPagination(nameArray);
		}
		
		
	} else {
		appendPagination(listOfItems);
	}
}

function noResults () {
	'use strict';
	for (let i = 0; i < listOfItems.length; i++) {
		listOfItems[i].style.display = 'none';
	}
	document.querySelector('.pagination').remove();
	const div = document.createElement('div');
	div.classList.add('pagination');
	div.textContent = 'Sorry, no results';
	document.querySelector('.page').append(div);
}

