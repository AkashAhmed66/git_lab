document.addEventListener('DOMContentLoaded', function() {
    // Initialize like functionality
    initializeLikeButtons();
    
    // Initialize comment posting
    initializeCommentPosting();
    
    // Initialize story hover effects
    initializeStoryHover();
    
    // Initialize bookmark functionality
    initializeBookmarkButtons();
    
    // Simulate loading new posts when scrolling to bottom
    initializeInfiniteScroll();
});

// Initialize like button functionality
function initializeLikeButtons() {
    const likeButtons = document.querySelectorAll('.post-actions-left .fa-heart');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle the like status
            if (this.classList.contains('far')) {
                // Like the post
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = '#ed4956';
                
                // Update like count
                const likesContainer = this.closest('.post').querySelector('.post-likes span');
                const currentLikes = parseInt(likesContainer.innerHTML.replace(/,/g, '').split(' ')[0]);
                likesContainer.innerHTML = `${currentLikes + 1} likes`;
                
                // Add like animation
                animateLike(this);
            } else {
                // Unlike the post
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = '';
                
                // Update like count
                const likesContainer = this.closest('.post').querySelector('.post-likes span');
                const currentLikes = parseInt(likesContainer.innerHTML.replace(/,/g, '').split(' ')[0]);
                likesContainer.innerHTML = `${currentLikes - 1} likes`;
            }
        });
    });
}

// Animate like icon
function animateLike(likeButton) {
    likeButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        likeButton.style.transform = 'scale(1)';
    }, 200);
}

// Initialize comment posting functionality
function initializeCommentPosting() {
    const commentForms = document.querySelectorAll('.add-comment');
    
    commentForms.forEach(form => {
        const input = form.querySelector('input');
        const button = form.querySelector('.post-comment-btn');
        
        // Disable button if input is empty
        button.disabled = true;
        
        // Enable/disable button based on input
        input.addEventListener('input', function() {
            button.disabled = this.value.trim() === '';
        });
        
        // Handle comment posting
        button.addEventListener('click', function() {
            if (input.value.trim() !== '') {
                const commentText = input.value.trim();
                const commentsSection = form.closest('.post').querySelector('.post-comments');
                
                // Create new comment element
                const newComment = document.createElement('div');
                newComment.className = 'post-comment';
                newComment.innerHTML = `
                    <span class="post-username">your_username</span>
                    <span class="comment-text">${commentText}</span>
                `;
                
                // Add comment to post
                commentsSection.appendChild(newComment);
                
                // Clear input
                input.value = '';
                button.disabled = true;
                
                // Update comment count in "View all X comments"
                const viewCommentsEl = commentsSection.querySelector('.view-comments');
                if (viewCommentsEl) {
                    const currentCount = parseInt(viewCommentsEl.textContent.match(/\d+/)[0]);
                    viewCommentsEl.textContent = `View all ${currentCount + 1} comments`;
                }
            }
        });
        
        // Allow posting with Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !button.disabled) {
                button.click();
            }
        });
    });
}

// Initialize story hover effects
function initializeStoryHover() {
    const stories = document.querySelectorAll('.story');
    
    stories.forEach(story => {
        story.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        story.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Initialize bookmark functionality
function initializeBookmarkButtons() {
    const bookmarkButtons = document.querySelectorAll('.post-actions-right .fa-bookmark');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle bookmark status
            if (this.classList.contains('far')) {
                this.classList.remove('far');
                this.classList.add('fas');
                
                // Show saved notification
                showNotification('Post saved');
            } else {
                this.classList.remove('fas');
                this.classList.add('far');
                
                // Show removed notification
                showNotification('Post removed from saved');
            }
        });
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '2000';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Initialize infinite scroll
function initializeInfiniteScroll() {
    let isLoading = false;
    
    window.addEventListener('scroll', function() {
        // Check if scrolled to bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            if (!isLoading) {
                isLoading = true;
                loadMorePosts();
                
                // Reset loading flag after delay
                setTimeout(() => {
                    isLoading = false;
                }, 2000);
            }
        }
    });
}

// Load more posts (simulation)
function loadMorePosts() {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading more posts...</div>
    `;
    loadingIndicator.style.textAlign = 'center';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.color = '#8e8e8e';
    
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #dbdbdb;
            border-top: 3px solid #0095f6;
            border-radius: 50%;
            margin: 0 auto 10px;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add to feed
    const feed = document.querySelector('.feed');
    feed.appendChild(loadingIndicator);
    
    // Simulate loading delay
    setTimeout(() => {
        // Remove loading indicator
        feed.removeChild(loadingIndicator);
        
        // Add new posts
        feed.appendChild(createNewPost({
            username: 'username3',
            location: 'Tokyo, Japan',
            likes: 3421,
            caption: 'Cherry blossoms in full bloom! 🌸 #tokyo #sakura #spring',
            comments: 134,
            timeAgo: '12 HOURS AGO'
        }));
        
        feed.appendChild(createNewPost({
            username: 'username4',
            location: 'Barcelona, Spain',
            likes: 2876,
            caption: 'Sagrada Familia never fails to amaze me! 🏛️ #barcelona #travel #architecture',
            comments: 98,
            timeAgo: '1 DAY AGO'
        }));
    }, 1500);
}

// Create a new post element
function createNewPost(postData) {
    const post = document.createElement('div');
    post.className = 'post';
    
    post.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="/api/placeholder/32/32" alt="user" class="post-user-avatar">
                <div class="post-user-info">
                    <span class="post-username">${postData.username}</span>
                    <span class="post-location">${postData.location}</span>
                </div>
            </div>
            <div class="post-more">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        <div class="post-image">
            <img src="/api/placeholder/600/400" alt="post">
        </div>
        <div class="post-actions">
            <div class="post-actions-left">
                <i class="far fa-heart"></i>
                <i class="far fa-comment"></i>
                <i class="far fa-paper-plane"></i>
            </div>
            <div class="post-actions-right">
                <i class="far fa-bookmark"></i>
            </div>
        </div>
        <div class="post-likes">
            <span>${postData.likes.toLocaleString()} likes</span>
        </div>
        <div class="post-caption">
            <span class="post-username">${postData.username}</span>
            <span class="caption-text">${postData.caption}</span>
        </div>
        <div class="post-comments">
            <span class="view-comments">View all ${postData.comments} comments</span>
        </div>
        <div class="post-time">
            <span>${postData.timeAgo}</span>
        </div>
        <div class="add-comment">
            <i class="far fa-smile"></i>
            <input type="text" placeholder="Add a comment...">
            <button class="post-comment-btn" disabled>Post</button>
        </div>
    `;
    
    // Initialize event listeners for the new post
    setTimeout(() => {
        initializeLikeButtons();
        initializeCommentPosting();
        initializeBookmarkButtons();
    }, 100);
    
    return post;
}

// Initialize double-tap to like
function initializeDoubleTapLike() {
    const postImages = document.querySelectorAll('.post-image');
    
    postImages.forEach(postImage => {
        let lastTap = 0;
        
        postImage.addEventListener('click', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                // Double tap detected
                const post = this.closest('.post');
                const likeButton = post.querySelector('.post-actions-left .fa-heart');
                
                // Only like if not already liked
                if (likeButton.classList.contains('far')) {
                    likeButton.click();
                    
                    // Show heart animation
                    const heart = document.createElement('div');
                    heart.className = 'double-tap-heart';
                    heart.innerHTML = '<i class="fas fa-heart"></i>';
                    heart.style.position = 'absolute';
                    heart.style.top = '50%';
                    heart.style.left = '50%';
                    heart.style.transform = 'translate(-50%, -50%)';
                    heart.style.color = 'white';
                    heart.style.fontSize = '80px';
                    heart.style.opacity = '0';
                    heart.style.textShadow = '0 0 20px rgba(0, 0, 0, 0.6)';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '10';
                    heart.style.animation = 'heartBeat 1s forwards';
                    
                    // Add animation keyframes
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes heartBeat {
                            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); }
                            30% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                            70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    // Add heart to post image
                    this.style.position = 'relative';
                    this.appendChild(heart);
                    
                    // Remove heart after animation
                    setTimeout(() => {
                        this.removeChild(heart);
                    }, 1000);
                }
            }
            
            lastTap = currentTime;
        });
    });
}

// Initialize follow buttons
function initializeFollowButtons() {
    const followButtons = document.querySelectorAll('.follow-link');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.color = '#262626';
                this.style.fontWeight = '400';
                
                // Show notification
                showNotification('Following');
            } else {
                this.textContent = 'Follow';
                this.style.color = '#0095f6';
                this.style.fontWeight = '600';
                
                // Show notification
                showNotification('Unfollowed');
            }
        });
    });
}

// Call additional initializations
window.addEventListener('load', function() {
    initializeDoubleTapLike();
    initializeFollowButtons();
});