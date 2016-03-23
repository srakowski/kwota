$(document).ready(function() {
                       
    kwota.loadModules([
        
        '/views/welcome',
        '/views/newQuota',
        '/views/quotas'
        
    ], function () {        
        
        var vm = new kwota.vm.AppViewModel();        
        
        kwota.nav.navigate = function (name, args) {
            
            if (name == "welcomeView") {
                vm.load("welcomeView", new kwota.vm.WelcomeViewModel());                
            } else if (name == "newQuotaView") {
                vm.load("newQuotaView", new kwota.vm.NewQuotaViewModel());                
            } else if (name == "quotasView") {
                vm.load("quotasView", new kwota.vm.QuotasViewModel(args)); 
            }
                                                                        
        };
                                
        ko.applyBindings(vm);
        vm.start();
                                       
    });
    
});