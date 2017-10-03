Template.dashboard.helpers({
    counts: function() {
        var allCount = [];
        var userCount = Counts.get('userCount');
        var premiumCount = Counts.get('premiumCount');
        var FreeCount = Counts.get('FreeCount');
        var directoryCount = Counts.get('premiumCount') + Counts.get('FreeCount');
        var tenantCount = Counts.get('tenantCount');

        allCount.push({
            'name': 'User Count',
            'count': userCount,
            'bgcolor': 'lightgreen'
        });
        allCount.push({
            'name': 'Premium Service Count',
            'count': premiumCount,
            'bgcolor': 'cyan'
        });
        allCount.push({
            'name': 'Free Service Count',
            'count': FreeCount,
            'bgcolor': 'purple'
        });
        allCount.push({
            'name': 'Directories Count',
            'count': directoryCount,
            'bgcolor': 'orange'
        });
        allCount.push({
            'name': 'Tenants Count',
            'count': tenantCount,
            'bgcolor': 'bluegray'
        });

        return allCount;

    }
});
