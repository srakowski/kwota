kwota.vm.UnfilledQuotaViewModel = function (id, onFill) {
    var self = this;
    self.id = id;
    self.fill = function (params) {
        $.ajax({
            type: "post",
            url: "/api/quota/fill",
            data: {
                id: self.id,                        
                note: self.note
            },
            success: onFill
            });        
    };
}

kwota.vm.QuotaViewModel = function (quota, quotas) {
    var self = this;
    self.id = quota._id;
    self.action = quota.action;
    self.instances = quota.instances;
    self.filledInstance = ko.observableArray([]);
    self.unfilledInstance = ko.observableArray([]);
    
    quota.fills.forEach(function (fill) {
        self.filledInstance.push(fill);
    });
        
    self.onFill = function () {
        self.filledInstance.push(self.unfilledInstance.pop());
        if (self.unfilledInstance().length == 0) {
            quotas.fillQuota(self);
        }   
    }        
        
    self.updateUnfilled = function () {
        var remaining = self.instances - self.filledInstance.length;
        var fills = [];               
        for (var i = 0; i < remaining; i++) {
            fills.push(new kwota.vm.UnfilledQuotaViewModel(self.id, self.onFill));           
        }        
        self.unfilledInstance(fills);
    };    
    
    self.updateUnfilled();
    
    self.reset = function (params) {
        $.ajax({
            type: "post",
            url: "/api/quota/reset",
            data: {
                id: self.id                
            },
            success: function () {
                quotas.resetQuota(self);
                self.filledInstance([]);                                     
                self.updateUnfilled();         
            }
        });      
    };        
};

kwota.vm.QuotasViewModel = function () {
    var self = this;
    self.hasQuotas = ko.observable(false); 
    self.noQuotas = ko.observable(false);   
    self.openQuotas = ko.observableArray();
    self.filledQuotas = ko.observableArray();       
                                
    self.newQuota = function () {
        window.location.href = "/new";
    };            
        
    self.fillQuota = function (quota) {
        var idx = self.openQuotas.indexOf(quota);
        self.openQuotas.splice(idx, 1);
        self.filledQuotas.push(quota);
    };    
            
    self.resetQuota = function (quota) {
        var idx = self.filledQuotas.indexOf(quota);
        self.filledQuotas.splice(idx, 1);
        self.openQuotas.push(quota);                 
    };            

    self.resetAll = function () {
        self.filledQuotas().forEach(function (quota) {
            quota.reset();            
        });      
    };

    self.beginRefresh = function (quota) {
        self.hasQuotas(false);
        self.noQuotas(false);                                
        $.get("/api/quota", self.endRefresh);                        
    };
                
    self.endRefresh = function (quotas) {
        self.hasQuotas(quotas.length > 0);
        self.noQuotas(quotas.length == 0);
        var filled = [];
        var open = [];        
        quotas.forEach(function (quota) {
            if (quota.fills.length >= Number(quota.instances)) {
                filled.push(new kwota.vm.QuotaViewModel(quota, self));            
            } else {
                open.push(new kwota.vm.QuotaViewModel(quota, self));
            }                         
            self.filledQuotas(filled);
            self.openQuotas(open);
        });                      
    }                                                                                               
};

$(document).ready(function() {    
    var vm = new kwota.vm.QuotasViewModel();
    ko.applyBindings(vm);                
    vm.beginRefresh();                
});