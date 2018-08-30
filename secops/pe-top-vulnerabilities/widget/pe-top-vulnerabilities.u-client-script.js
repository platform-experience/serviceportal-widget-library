function TopVulnerabilitiesController($window) {
  var c = this;

  c.$onInit = function() {
    c.vulns = c.data.vulns;
  };

  c.getPercentage = function(num) {
    return (num / 10) * 100;
  };

  c.getClass = function(num) {
    if (num <= 5) {
      return 'low-risk';
    }
    if (num > 5 && num < 7) {
      return 'medium-risk';
    }
    if (num >= 7) {
      return 'high-risk';
    }
  };

  c.gotoCVE = function(id) {
    $window.location = '?id=secops_cve_details&cve_id=' + id;
  };
}
