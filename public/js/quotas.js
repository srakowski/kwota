kwota.vm.QuotaViewModel = function (quota, quotas) {
    var self = this;
    self.id = quota._id;
    self.action = quota.action;
    self.instances = quota.instances;
    self.filledInstance = ko.observableArray();
    quota.fills.forEach(function (fill) {
        self.filledInstance.push(fill);
    });
    
    self.reset = function (params) {
        $.ajax({
            type: "post",
            url: "/api/quota/reset",
            data: {
                id: self.id                
            },
            success: function () {
                self.filledInstance.length = 0;
                               
            }
        });      
    };
    
    var remaining = Number(quota.instances) - quota.fills.length;
    self.unfilledInstance = ko.observableArray();
    for (var i = 0; i < remaining; i++) {
        self.unfilledInstance.push({
            fill: function (params) {
                $.ajax({
                    type: "post",
                    url: "/api/quota/fill",
                    data: {
                        id: self.id,                        
                        note: self.note                                                                        
                    },
                    success: function () {
                        self.filledInstance.push(self.unfilledInstance.pop());       
                        if (self.unfilledInstance().length == 0) {
                            quotas.fillQuota(self);                                                        
                        }                                                                              
                    }
                });                 
            }
        });
    }
};

kwota.vm.QuotasViewModel = function (quotas) {
    var self = this;
    self.hasQuotas = ko.observable(false);    
    self.openQuotas = ko.observableArray();
    self.filledQuotas = ko.observableArray();
        
    self.resetQuota = function (quota) {         
    };
                                
    self.newQuota = function () {
        window.location.href = "/new";
    };            
        
    self.fillQuota = function (quota) {
        var idx = self.openQuotas.indexOf(quota);
        self.openQuotas.splice(idx, 1);
        self.filledQuotas.push(quota);
    };    
            
    quotas.forEach(function (quota) {
        self.hasQuotas(true);
        if (quota.fills.length >= Number(quota.instances)) {
            self.filledQuotas.push(new kwota.vm.QuotaViewModel(quota, self));            
        } else {
            self.openQuotas.push(new kwota.vm.QuotaViewModel(quota, self));
        }                         
    });                                                                               
};

$(document).ready(function() {
    
    $.get("/api/quota", function (quotas) {
        var vm = new kwota.vm.QuotasViewModel(quotas);
        ko.applyBindings(vm);        
    });        
                
});