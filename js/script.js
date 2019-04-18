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

//dynmically builds the seach bar so if someone has javascript disabled they will not see it
let searchInput; 
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

//the function that gets called when you type into the search bar
function search () {
	
	'use strict';
	const searchValue = searchInput.value;
	const nameArray = [];
	
	if (searchValue !== '' && searchValue !== null) {
		
		const names = document.querySelectorAll('H3');//gathers the names on the page to filter through
		
		//filter through the names array comparing them to the search value
		for (let i = 0; i < names.length; i++) {
			
			const nameToCompare = names[i].textContent;
			let nameFound = true;
			
			for (let x = 0; x < searchValue.length; x++) {
				if (searchValue[x].toUpperCase() !== nameToCompare[x].toUpperCase()) {
					nameFound = false;
				}
			}
			//if the name is found we must cycle though our ist of items holding all the people to find the correct one and add it to the search results
			if (nameFound) {
				for (let t = 0; t < listOfItems.length; t++) {
					const listName = listOfItems[t].firstElementChild.children[1].textContent;
					if (listName === nameToCompare) {
						nameArray.push(listOfItems[t]);
					}
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

//if our search returns no one this gets called
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

