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
	const pageLinkCount = Math.floor(list.length / itemsPerPage);
	
	let html = `<div class="pagination">
					<ul>`;
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
	
	const page = document.querySelector('.page');
	page.innerHTML += html;
	
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
			showPage(listOfItems, pageNumber);
		}													   
	});
	
}

