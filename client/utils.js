function memoize(fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);

    var key = "", len = args.length, cur = null;

    while (len--) {
      cur = args[len];
      key += (cur === Object(cur)) ? JSON.stringify(cur) : cur;

      fn.memoize || (fn.memoize = {});
    }

    return (key in fn.memoize) ? fn.memoize[key] :
      fn.memoize[key] = fn.apply(this, args);
  };
}

function geodecoder(features) {

  var store = {};

  for (var i = 0; i < features.length; i++) {
    store[features[i].id] = features[i];
  }

  return {
    find: function (id) {
      return store[id];
    },
    search: function (lat, lng) {

      var match = false;

      var country, coords;

      for (var i = 0; i < features.length; i++) {
        country = features[i];
        if (country.geometry.type === 'Polygon') {
          match = pointInPolygon(country.geometry.coordinates[0], [lng, lat]);
          if (match) {
            return {
              code: features[i].id,
              name: features[i].properties.name
            };
          }
        } else if (country.geometry.type === 'MultiPolygon') {
          coords = country.geometry.coordinates;
          for (var j = 0; j < coords.length; j++) {
            match = pointInPolygon(coords[j][0], [lng, lat]);
            if (match) {
              return {
                code: features[i].id,
                name: features[i].properties.name
              };
            }
          }
        }
      }

      return null;
    }
  };
}

function mapTexture(geojson, color, strokeColor) {
  var texture, context, canvas;

  // map hackery
  var projection = d3.geo.equirectangular()
    .translate([2048, 1024])
    .scale(650);

  canvas = d3.select("body").append("canvas")
    .style("display", "none")
    .attr("width", "4096px")
    .attr("height", "2048px");

  context = canvas.node().getContext("2d");

  var path = d3.geo.path()
    .projection(projection)
    .context(context);

  context.strokeStyle = strokeColor || "#333";
  context.lineWidth = 1;
  context.fillStyle = color || "#CDB380";

  context.beginPath();

  path(geojson);

  if (color) {
    context.fill();
  }

  context.stroke();

  texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return texture;
}

function wrap(value, min, rangeSize) {
  rangeSize -= min;
  while (value < min) {
    value += rangeSize;
  }
  return value % rangeSize;
}

var ISO3166 = {};

ISO3166.codeToCountry = {
  'AF': 'AFGHANISTAN',
  'AX': 'ÅLAND ISLANDS',
  'AL': 'ALBANIA',
  'DZ': 'ALGERIA',
  'AS': 'AMERICAN SAMOA',
  'AD': 'ANDORRA',
  'AO': 'ANGOLA',
  'AI': 'ANGUILLA',
  'AQ': 'ANTARCTICA',
  'AG': 'ANTIGUA AND BARBUDA',
  'AR': 'ARGENTINA',
  'AM': 'ARMENIA',
  'AW': 'ARUBA',
  'AU': 'AUSTRALIA',
  'AT': 'AUSTRIA',
  'AZ': 'AZERBAIJAN',
  'BS': 'BAHAMAS',
  'BH': 'BAHRAIN',
  'BD': 'BANGLADESH',
  'BB': 'BARBADOS',
  'BY': 'BELARUS',
  'BE': 'BELGIUM',
  'BZ': 'BELIZE',
  'BJ': 'BENIN',
  'BM': 'BERMUDA',
  'BT': 'BHUTAN',
  'BO': 'BOLIVIA, PLURINATIONAL STATE OF',
  'BQ': 'BONAIRE, SINT EUSTATIUS AND SABA',
  'BA': 'BOSNIA AND HERZEGOVINA',
  'BW': 'BOTSWANA',
  'BV': 'BOUVET ISLAND',
  'BR': 'BRAZIL',
  'IO': 'BRITISH INDIAN OCEAN TERRITORY',
  'BN': 'BRUNEI DARUSSALAM',
  'BG': 'BULGARIA',
  'BF': 'BURKINA FASO',
  'BI': 'BURUNDI',
  'KH': 'CAMBODIA',
  'CM': 'CAMEROON',
  'CA': 'CANADA',
  'CV': 'CAPE VERDE',
  'KY': 'CAYMAN ISLANDS',
  'CF': 'CENTRAL AFRICAN REPUBLIC',
  'TD': 'CHAD',
  'CL': 'CHILE',
  'CN': 'CHINA',
  'CX': 'CHRISTMAS ISLAND',
  'CC': 'COCOS (KEELING) ISLANDS',
  'CO': 'COLOMBIA',
  'KM': 'COMOROS',
  'CG': 'CONGO',
  'CD': 'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
  'CK': 'COOK ISLANDS',
  'CR': 'COSTA RICA',
  'CI': 'CÔTE D\'IVOIRE',
  'HR': 'CROATIA',
  'CU': 'CUBA',
  'CW': 'CURAÇAO',
  'CY': 'CYPRUS',
  'CZ': 'CZECH REPUBLIC',
  'DK': 'DENMARK',
  'DJ': 'DJIBOUTI',
  'DM': 'DOMINICA',
  'DO': 'DOMINICAN REPUBLIC',
  'EC': 'ECUADOR',
  'EG': 'EGYPT',
  'SV': 'EL SALVADOR',
  'GQ': 'EQUATORIAL GUINEA',
  'ER': 'ERITREA',
  'EE': 'ESTONIA',
  'ET': 'ETHIOPIA',
  'FK': 'FALKLAND ISLANDS (MALVINAS)',
  'FO': 'FAROE ISLANDS',
  'FJ': 'FIJI',
  'FI': 'FINLAND',
  'FR': 'FRANCE',
  'GF': 'FRENCH GUIANA',
  'PF': 'FRENCH POLYNESIA',
  'TF': 'FRENCH SOUTHERN TERRITORIES',
  'GA': 'GABON',
  'GM': 'GAMBIA',
  'GE': 'GEORGIA',
  'DE': 'GERMANY',
  'GH': 'GHANA',
  'GI': 'GIBRALTAR',
  'GR': 'GREECE',
  'GL': 'GREENLAND',
  'GD': 'GRENADA',
  'GP': 'GUADELOUPE',
  'GU': 'GUAM',
  'GT': 'GUATEMALA',
  'GG': 'GUERNSEY',
  'GN': 'GUINEA',
  'GW': 'GUINEA-BISSAU',
  'GY': 'GUYANA',
  'HT': 'HAITI',
  'HM': 'HEARD ISLAND AND MCDONALD ISLANDS',
  'VA': 'HOLY SEE (VATICAN CITY STATE)',
  'HN': 'HONDURAS',
  'HK': 'HONG KONG',
  'HU': 'HUNGARY',
  'IS': 'ICELAND',
  'IN': 'INDIA',
  'ID': 'INDONESIA',
  'IR': 'IRAN, ISLAMIC REPUBLIC OF',
  'IQ': 'IRAQ',
  'IE': 'IRELAND',
  'IM': 'ISLE OF MAN',
  'IL': 'ISRAEL',
  'IT': 'ITALY',
  'JM': 'JAMAICA',
  'JP': 'JAPAN',
  'JE': 'JERSEY',
  'JO': 'JORDAN',
  'KZ': 'KAZAKHSTAN',
  'KE': 'KENYA',
  'KI': 'KIRIBATI',
  'KP': 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',
  'KR': 'KOREA, REPUBLIC OF',
  'KW': 'KUWAIT',
  'KG': 'KYRGYZSTAN',
  'LA': 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC',
  'LV': 'LATVIA',
  'LB': 'LEBANON',
  'LS': 'LESOTHO',
  'LR': 'LIBERIA',
  'LY': 'LIBYA',
  'LI': 'LIECHTENSTEIN',
  'LT': 'LITHUANIA',
  'LU': 'LUXEMBOURG',
  'MO': 'MACAO',
  'MK': 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
  'MG': 'MADAGASCAR',
  'MW': 'MALAWI',
  'MY': 'MALAYSIA',
  'MV': 'MALDIVES',
  'ML': 'MALI',
  'MT': 'MALTA',
  'MH': 'MARSHALL ISLANDS',
  'MQ': 'MARTINIQUE',
  'MR': 'MAURITANIA',
  'MU': 'MAURITIUS',
  'YT': 'MAYOTTE',
  'MX': 'MEXICO',
  'FM': 'MICRONESIA, FEDERATED STATES OF',
  'MD': 'MOLDOVA, REPUBLIC OF',
  'MC': 'MONACO',
  'MN': 'MONGOLIA',
  'ME': 'MONTENEGRO',
  'MS': 'MONTSERRAT',
  'MA': 'MOROCCO',
  'MZ': 'MOZAMBIQUE',
  'MM': 'MYANMAR',
  'NA': 'NAMIBIA',
  'NR': 'NAURU',
  'NP': 'NEPAL',
  'NL': 'NETHERLANDS',
  'NC': 'NEW CALEDONIA',
  'NZ': 'NEW ZEALAND',
  'NI': 'NICARAGUA',
  'NE': 'NIGER',
  'NG': 'NIGERIA',
  'NU': 'NIUE',
  'NF': 'NORFOLK ISLAND',
  'MP': 'NORTHERN MARIANA ISLANDS',
  'NO': 'NORWAY',
  'OM': 'OMAN',
  'PK': 'PAKISTAN',
  'PW': 'PALAU',
  'PS': 'PALESTINE, STATE OF',
  'PA': 'PANAMA',
  'PG': 'PAPUA NEW GUINEA',
  'PY': 'PARAGUAY',
  'PE': 'PERU',
  'PH': 'PHILIPPINES',
  'PN': 'PITCAIRN',
  'PL': 'POLAND',
  'PT': 'PORTUGAL',
  'PR': 'PUERTO RICO',
  'QA': 'QATAR',
  'RE': 'RÉUNION',
  'RO': 'ROMANIA',
  'RU': 'RUSSIAN FEDERATION',
  'RW': 'RWANDA',
  'BL': 'SAINT BARTHÉLEMY',
  'SH': 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA',
  'KN': 'SAINT KITTS AND NEVIS',
  'LC': 'SAINT LUCIA',
  'MF': 'SAINT MARTIN (FRENCH PART)',
  'PM': 'SAINT PIERRE AND MIQUELON',
  'VC': 'SAINT VINCENT AND THE GRENADINES',
  'WS': 'SAMOA',
  'SM': 'SAN MARINO',
  'ST': 'SAO TOME AND PRINCIPE',
  'SA': 'SAUDI ARABIA',
  'SN': 'SENEGAL',
  'RS': 'SERBIA',
  'SC': 'SEYCHELLES',
  'SL': 'SIERRA LEONE',
  'SG': 'SINGAPORE',
  'SX': 'SINT MAARTEN (DUTCH PART)',
  'SK': 'SLOVAKIA',
  'SI': 'SLOVENIA',
  'SB': 'SOLOMON ISLANDS',
  'SO': 'SOMALIA',
  'ZA': 'SOUTH AFRICA',
  'GS': 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
  'SS': 'SOUTH SUDAN',
  'ES': 'SPAIN',
  'LK': 'SRI LANKA',
  'SD': 'SUDAN',
  'SR': 'SURINAME',
  'SJ': 'SVALBARD AND JAN MAYEN',
  'SZ': 'SWAZILAND',
  'SE': 'SWEDEN',
  'CH': 'SWITZERLAND',
  'SY': 'SYRIAN ARAB REPUBLIC',
  'TW': 'TAIWAN, PROVINCE OF CHINA',
  'TJ': 'TAJIKISTAN',
  'TZ': 'TANZANIA, UNITED REPUBLIC OF',
  'TH': 'THAILAND',
  'TL': 'TIMOR-LESTE',
  'TG': 'TOGO',
  'TK': 'TOKELAU',
  'TO': 'TONGA',
  'TT': 'TRINIDAD AND TOBAGO',
  'TN': 'TUNISIA',
  'TR': 'TURKEY',
  'TM': 'TURKMENISTAN',
  'TC': 'TURKS AND CAICOS ISLANDS',
  'TV': 'TUVALU',
  'UG': 'UGANDA',
  'UA': 'UKRAINE',
  'AE': 'UNITED ARAB EMIRATES',
  'GB': 'UNITED KINGDOM',
  'US': 'UNITED STATES',
  'UM': 'UNITED STATES MINOR OUTLYING ISLANDS',
  'UY': 'URUGUAY',
  'UZ': 'UZBEKISTAN',
  'VU': 'VANUATU',
  'VE': 'VENEZUELA, BOLIVARIAN REPUBLIC OF',
  'VN': 'VIET NAM',
  'VG': 'VIRGIN ISLANDS, BRITISH',
  'VI': 'VIRGIN ISLANDS, U.S.',
  'WF': 'WALLIS AND FUTUNA',
  'EH': 'WESTERN SAHARA',
  'YE': 'YEMEN',
  'ZM': 'ZAMBIA',
  'ZW': 'ZIMBABWE'
};

ISO3166.countryToCode = {};

for (var key in ISO3166.codeToCountry) {
  ISO3166.countryToCode[ISO3166.codeToCountry[key]] = key;
}

ISO3166.countryToCode["SOUTH KOREA"] = "KR";

var latLonData;
d3.json('data/country_lat_lon.json', function (error, latlon) {
  if (error) return console.warn(error);
  latLonData = latlon;
});

console.log(latLonData);
var previouslySelectedCountry;
function panToCountry(selectedCountry) {
  if (previouslySelectedCountry !== selectedCountry) {
    console.log(ISO3166.countryToCode[selectedCountry.id.toUpperCase()]);
    selectedCountry = latLonData.countries[ISO3166.countryToCode[selectedCountry.id.toUpperCase()]];
    if (selectedCountry) {
      console.log(selectedCountry);
      globe.target.x = selectedCountry.lat * Math.PI / 180;
      var targetY0 = -(selectedCountry.lon - 9) * Math.PI / 180;
      globe.target.y = wrap(targetY0, -Math.PI, Math.PI);
/*
      var piCounter = 0;
      while (true) {
        var targetY0Neg = targetY0 - Math.PI * 2 * piCounter;
        var targetY0Pos = targetY0 + Math.PI * 2 * piCounter;
        console.log("Neg:" + targetY0Neg);
        console.log("Pos:" + targetY0Pos);
        console.log(globe.target.y);
        if (Math.abs(targetY0Neg - globe.target.y) < Math.PI) {
          globe.target.y = targetY0Neg;
          break;
        } else if (Math.abs(targetY0Pos - globe.target.y) < Math.PI) {
          globe.target.y = targetY0Pos;
          break;
        }
        piCounter++;
        globe.target.y = wrap(targetY0, -Math.PI, Math.PI);
      }*/
    }
    previouslySelectedCountry = selectedCountry
  }
}