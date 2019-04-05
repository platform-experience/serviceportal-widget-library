var LanguageService = Class.create();
LanguageService.prototype = {
  initialize: function() {},
  getModel: function(model) {
    var language;
    var languages = {
      Arabic: function() {
        language = 'ar';
      },
      Chinese: function() {
        language = 'zh';
      },
      Czech: function() {
        language = 'cs';
      },
      Danish: function() {
        language = 'da';
      },
      Dutch: function() {
        language = 'nl';
      },
      French: function() {
        language = 'fr';
      },
      German: function() {
        language = 'de';
      },
      Hindi: function() {
        language = 'hi';
      },
      Italian: function() {
        language = 'it';
      },
      Japanese: function() {
        language = 'ja';
      },
      Korean: function() {
        language = 'ko';
      },
      Polish: function() {
        language = 'pl';
      },
      Portuguese: function() {
        language = 'pt';
      },
      Russian: function() {
        language = 'ru';
      },
      Spanish: function() {
        language = 'es';
      },
      Swedish: function() {
        language = 'sv';
      },
      Turkish: function() {
        language = 'tr';
      }
    };
    (languages[model] || languages['default'])();
    return language;
  },
  translate: function(text, target) {
    var model = 'en' + '-' + this.getModel(target);
    try {
      var r = new sn_ws.RESTMessageV2('Watson Language Translator', 'Translate');
      r.setStringParameterNoEscape('text', text);
      r.setStringParameterNoEscape('model_id', model);
      var response = r.execute();
      var responseBody = response.getBody();
      var result = JSON.parse(responseBody);
      return result.translations[0].translation;
    } catch (ex) {
      console.log(ex);
    }
  },

  type: 'LanguageService'
};
