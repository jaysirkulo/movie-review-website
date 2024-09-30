document.getElementById('review-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let title = document.getElementById('title').value;
  let rating = document.getElementById('rating').value;
  let reviewText = document.getElementById('review-text').value;

  let review = {
    title: title,
    rating: rating,
    reviewText: reviewText,
    date: new Date().toLocaleString()
  };

  document.getElementById('sort-by-date').addEventListener('click', function() {
    displayReviews('date');
  });

  document.getElementById('sort-by-rating').addEventListener('click', function() {
    displayReviews('rating');
  });

  // Save the review to localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));

  // Clear the form
  document.getElementById('review-form').reset();

  // Display reviews
  displayReviews();
});

function displayReviews(sortBy = 'date') {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Sort the reviews based on the criteria
  if (sortBy === 'date') {
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (most recent first)
  } else if (sortBy === 'rating') {
    reviews.sort((a, b) => b.rating - a.rating); // Sort by rating (higherst first)
  }

  let reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';

  reviews.forEach(review => {
    let reviewItem = document.createElement('div');
    reviewItem.innerHTML = `
        <h3>${review.title}</h3>
        <p>Rating: ${review.rating}/5</p>
        <p>${review.reviewText}</p>
        <small>Reviewed on: ${review.date}</small>
        <hr>
      `;
    reviewList.appendChild(reviewItem);
  });
}

// Display reviews on page load
window.onload = displayReviews;
