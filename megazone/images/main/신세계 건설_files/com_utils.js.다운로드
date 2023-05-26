/*
*
* common utils module
* pwrlove@nooto.co.kr
*
*/

var com_utils;
if(!com_utils) com_utils = {};
(function() {

	com_utils.VERSION = '1.0.0';

	/**
	 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
	 * @param str       : 체크할 문자열
	 */
	com_utils.isEmpty = function(str)
	{
		if(typeof str == "undefined" || str == null || str == "")
			return true;
		else
			return false;
	}

	/**
	 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
	 * @param str           : 체크할 문자열
	 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
	 */
	com_utils.nvl = function(str, defaultStr)
	{
		if ( this.isEmpty(str) )
		{
			str = defaultStr;
		}

		return str;
	}

	//-----------------------------------------
	com_utils.getFileExt = function(file_nm)
	{
		var file_len = file_nm.length;
		var lastDot = file_nm.lastIndexOf('.');
		var file_ext = file_nm.substring(lastDot+1, file_len);

		return file_ext;
	}

	//-----------------------------------------
	com_utils.convertDateFormat = function (date, delim, order)
	{
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month >= 10 ? month : '0' + month;
		var day = date.getDate();
		day = day >= 10 ? day : '0' + day;

		var result;
		if (order === 'ymd')
		{
			if (delim === '-')
			{
				result = [year, month, day].join('-');
			}
			else if (delim === '/')
			{
				result = [year, month, day].join('/');
			}
		}
		else
		{
			if (delim === '-')
			{
				result = [month, day, year].join('-');
			}
			else if (delim === '/')
			{
				result = [month, day, year].join('/');
			}
		}

		return result;
	}

	//-----------------------------------------
	com_utils.sendFiles = function (csrf_token, url, formData, loading_id, callback)
	{
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': csrf_token
			}
		});

		$.ajax({
			url: url,
			processData : false,
			contentType: false,
			data: formData,
			type: 'POST',
			dataType: "json",
			success: function(res) {
				if (res!=null)
				{
					if(callback!=null)
					{
						callback(res);
					}
				}

				$(loading_id).hide();
			},
			beforeSend:function(){
				$(loading_id).show();
			},
			complete:function(){
				$(loading_id).hide();
			},
			error:function(e){
			}
			// ,
			// timeout:3000 //"응답제한시간 ms"
		});
	}

	//-----------------------------------------
	//레코드와 파일을 모두 한번에 처리
	com_utils.request = function (csrf_token, url, data, arrImage, attach, loading_id, callback)
	{
		var n = 0;
		var files = null;
		var formData = new FormData();

		formData.append("data", JSON.stringify(data));

		if (arrImage != null)
		{
			$.each(arrImage, function(i, image_id){

				var inputFile = $(image_id);
				var file_text = $(image_id+'_text');
				files = inputFile[0].files;
				
				if (files.length !== 0)
				{
					formData.append("file"			+n	, files[0]);
					formData.append("file_nm"		+n	, files[0].name);
					formData.append("file_size"		+n	, files[0].size);
					formData.append("file_type"		+n	, files[0].type);
					formData.append("file_view_id"	+n	, image_id);
					formData.append("file_ext"		+n	, com_utils.getFileExt(files[0].name));
					formData.append("file_text"		+n	, (com_utils.isEmpty(file_text))?'':file_text.val());
					n++;
				}
			});
		}

		if (attach != null)
		{
			files = $(attach)[0].files;
			for(var i = 0; i < files.length; i++)
			{
				formData.append("file"			+n	, files[i]);
				formData.append("file_nm"		+n	, files[i].name);
				formData.append("file_size"		+n	, files[i].size);
				formData.append("file_type"		+n	, files[i].type);
				formData.append("file_view_id"	+n	, attach);
				formData.append("file_ext"		+n	, com_utils.getFileExt(files[i].name));
				n++;
			}
		}

		formData.append("file_count", n);

		com_utils.sendFiles(csrf_token, url, formData, loading_id, callback);
	}

	//-----------------------------------------
	//복수개 arrImage 처리(주로 첨부이미지 처리)
	com_utils.uploadMany = function (csrf_token, url, arrImage, loading_id, callback)
	{
		var n = 0;
		var formData = new FormData();

		$.each(arrImage, function(i, image_id){

			var inputFile = $(image_id);
			var files = inputFile[0].files;
			
			if (files.length !== 0)
			{
				formData.append("file"			+n	, files[0]);
				formData.append("file_nm"		+n	, files[0].name);
				formData.append("file_size"		+n	, files[0].size);
				formData.append("file_type"		+n	, files[0].type);
				formData.append("file_view_id"	+n	, image_id);
				formData.append("file_ext"		+n	, com_utils.getFileExt(files[0].name));
				n++;
			}
		});

		formData.append("file_count", n);
		com_utils.sendFiles(csrf_token, url, formData, loading_id, callback);
	}

	//-----------------------------------------
	//단일 file_id의 복수개 파일 처리(주로 첨부파일 처리)
	com_utils.uploadSingle = function (csrf_token, url, file_id, loading_id, callback)
	{
		var formData = new FormData();
		var files = $("#"+file_id)[0].files;
		for(var i = 0; i < files.length; i++)
		{
			formData.append("file"			+i	, files[i]);
			formData.append("file_nm"		+i	, files[i].name);
			formData.append("file_size"		+i	, files[i].size);
			formData.append("file_type"		+i	, files[i].type);
			formData.append("file_view_id"	+i	, "#"+file_id);	//#을 포함해서 저장해야 한다.
			formData.append("file_ext"		+i	, com_utils.getFileExt(files[i].name));
		}

		formData.append("file_count", files.length);
		com_utils.sendFiles(csrf_token, url, formData, loading_id, callback);
	}

	//-----------------------------------------
    com_utils.get = function(url, params, response)
    {
		com_utils.callAjax(
			url,
			"GET",
			params,
			function(xhr, status, error)
			{
				var res = {
					code: "9999",
					message: error
				}
				response(res);
			},
			function(res)
            {
				if(res==null)
				{
					res = {
						code: "9998",
						message: "server response error."
					}
				}

				response(res);
			}
		);
    }

	//-----------------------------------------
    com_utils.post = function(url, params, response)
    {
		com_utils.callAjax(
			url,
			"POST",
			params,
			function(xhr, status, error)
			{
				var res = {
					code: "9999",
					message: error
				}
				response(res);
			},
			function(res)
            {
				if(res==null)
				{
					res = {
						code: "9998",
						message: "server response error."
					}
				}

				response(res);
			}
		);
    }

	//-----------------------------------------
	com_utils.callAjax = function (url, method, params, doError, doSuccess)
	{
		$.ajax({
			//-----------------
			//request
			//-----------------
			url: url,
			type: method,
			
			//-----------------
			//json format
			//-----------------
			data: JSON.stringify(params),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,

			//-----------------
			//response
			//-----------------
			error: 	 doError,
			success: doSuccess
		});
	}

	//-----------------------------------------
	com_utils.generateHtml = function (id, data)
	{
		var html = $(id).html();
		var array = html.match(/@{(\w+[.]?)+}/g);
		if (array == null)
		{
			return html;
		}

		for(var i=0, len=array.length; i<len; i++)
		{
			html = html.replace(array[i], com_utils.findValue(array[i], data));
		}

		return html;
	}

	//-----------------------------------------
	com_utils.findValue = function (key, data)
	{
		key = key.replace(/(@{|})/g,'');
		return com_utils.recursive(key.split("."), data);
	}

	//-----------------------------------------
	com_utils.recursive = function (keys, data)
	{
		var result = data[keys[0]];
		if(result === undefined || result === null)
		{
			return '';
		}

		if (keys.length > 1)
		{
			return com_utils.recursive(keys.slice(1), result);
		}

		return result;
	}

	//-----------------------------------------
	//  Secure Hash Algorithm (SHA256).
	//-----------------------------------------
	com_utils.SHA256 = function (s)
	{
		var chrsz   = 8;
		var hexcase = 0;

		function safe_add (x, y)
		{
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
		function R (X, n) { return ( X >>> n ); }
		function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
		function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
		function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
		function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
		function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
		function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

		function core_sha256 (m, l) 
		{

			var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
				0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
				0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
				0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
				0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
				0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
				0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
				0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
				0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
				0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
				0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

			var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

			var W = new Array(64);
			var a, b, c, d, e, f, g, h, i, j;
			var T1, T2;

			m[l >> 5] |= 0x80 << (24 - l % 32);
			m[((l + 64 >> 9) << 4) + 15] = l;

			for ( var i = 0; i<m.length; i+=16 )
			{
				a = HASH[0];
				b = HASH[1];
				c = HASH[2];
				d = HASH[3];
				e = HASH[4];
				f = HASH[5];
				g = HASH[6];
				h = HASH[7];

				for ( var j = 0; j<64; j++)
				{
					if (j < 16) W[j] = m[j + i];
					else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

					T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
					T2 = safe_add(Sigma0256(a), Maj(a, b, c));

					h = g;
					g = f;
					f = e;
					e = safe_add(d, T1);
					d = c;
					c = b;
					b = a;
					a = safe_add(T1, T2);
				}

				HASH[0] = safe_add(a, HASH[0]);
				HASH[1] = safe_add(b, HASH[1]);
				HASH[2] = safe_add(c, HASH[2]);
				HASH[3] = safe_add(d, HASH[3]);
				HASH[4] = safe_add(e, HASH[4]);
				HASH[5] = safe_add(f, HASH[5]);
				HASH[6] = safe_add(g, HASH[6]);
				HASH[7] = safe_add(h, HASH[7]);
			}

			return HASH;
		}

		function str2binb (str)
		{
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for(var i = 0; i < str.length * chrsz; i += chrsz)
			{
				bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
			}
			return bin;
		}

		function Utf8Encode(string)
		{
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++)
			{

				var c = string.charCodeAt(n);

				if (c < 128)
				{
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048))
				{
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else
				{
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}

			return utftext;
		}

		function binb2hex (binarray)
		{
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for(var i = 0; i < binarray.length * 4; i++)
			{
				str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
					hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
			}
			return str;
		}

		s = Utf8Encode(s);
		return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
	}

	return com_utils;

})();
