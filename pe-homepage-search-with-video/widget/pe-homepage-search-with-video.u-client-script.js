function homepageSearchWithVideo($scope, $timeout, $window) {
	/* widget controller */
	var c = this;
	c.$onInit = function () {
		$scope.videoId = c.data.video.youtbeUrl;
		$scope.quality = c.data.video.quality;
		$scope.mobilefallBackImage = c.data.video.mobilefallBackImage;
		$scope.videoStopat = c.data.video.videoStopat;
		$scope.videoStartat = c.data.video.videoStartat || 0;
		$scope.alignment = c.data.video.alignment;
		$scope.videoJson = "{videoURL:'"+$scope.videoId +"',containment:'.video-section', quality:'"+$scope.quality+"', mobileFallbackImage:'"+$scope.mobilefallBackImage+"', startAt:"+$scope.videoStartat+", stopAt:"+$scope.videoStopat+", align:'"+$scope.alignment+"'}";
			$timeout(function() {
				$(function() {
					$("#bgndVideo").mb_YTPlayer();
					$window.YTConfig = {
						host: 'https://www.youtube.com'
					};
				});
			}, 50);
		}

	}
