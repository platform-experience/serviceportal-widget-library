var homepageSearchRecord = options.homepage_search_record;
data.typeAheadSearch = $sp.getWidget('typeahead-search', {'title':options.search_box_typeahead});
	data.video = {};
		var banGr = new GlideRecord('x_snc_homepage_sea_x_snc_homepage_search_background');
		banGr.addQuery('sys_id', homepageSearchRecord);
		banGr.addQuery('u_active', true);
		banGr.query();
		if (banGr.next()) {

			var temp = {};
				temp.name = banGr.getDisplayValue('u_name');
				temp.youtbeUrl = banGr.getDisplayValue('u_youtube_url');
				temp.quality = banGr.getDisplayValue('u_quality');
				temp.mobilefallBackImage = banGr.getDisplayValue('u_mobile_fallback_image');
				temp.videoStopat = banGr.getDisplayValue('u_video_stopat');
				temp.videoStartat = banGr.getDisplayValue('u_video_startat');
				temp.alignment = banGr.getDisplayValue('u_alignment');
				data.video = temp;
			}
