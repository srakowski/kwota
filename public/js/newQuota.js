kwota.vm.NewQuotaViewModel = function (params) {
    var self = this;
    self.action = ko.observable();
    self.instances = ko.observable(3);
    self.create = function (params) {
        $.ajax({
            type: "post",
            url: "/api/quota/",
            data: { 
                action: self.action(),
                instances: self.instances()                    
            }, 
            success: self.endCreate,
            error: function (err) {
                alert(err);
            }
        });
    }
    self.endCreate = function () {
        window.location.href = "/";
    }
};

$(document).ready(function() {
    
    var vm = new kwota.vm.NewQuotaViewModel();
    ko.applyBindings(vm);                
                
});