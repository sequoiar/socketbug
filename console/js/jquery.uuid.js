/**
 *	Usage:
 *		jQuery.GUID.value() // Returns value of internal GUID. If no guid has been specified, returns a new one (value is then stored internally).
 *		jQuery.GUID.new() // Returns a new GUID and sets it's value internally. Also accepts GUID, sets it internally.
 *		jQuery.GUID.empty() // Returns an empty GUID 00000000-0000-0000-0000-000000000000.
 *		jQuery.GUID.is_empty() // Returns boolean. True if empty/undefined/blank/null.
 *		jQuery.GUID.is_valid() // Returns boolean. True valid guid, false if not.
 *		jQuery.GUID.set() // Retrns GUID. sets GUID to user specified GUID, if invalid, returns an empty guid.
 *
 */

jQuery.extend(
{
	GUID: 
	{
		set: function(val) 
		{
			var value;
			if (arguments.length == 1) 
			{
				if (this.is_valid(arguments[0])) 
				{
					value = arguments[0];
				}
				else
				{
					value = this.empty();
				}
			}
			$(this).data("value", value);
			return value;
		},

		empty: function()
		{
			return "00000000-0000-0000-0000-000000000000";
		},

		is_empty: function(gid)
		{
			return gid == this.empty() || typeof (gid) == 'undefined' || gid == null || gid == '';
		},

		is_valid: function(value)
		{
			if(value.length !== 36)
			{
				return false;
			}
			rGx = new RegExp("\\b(?:[A-F0-9]{8})(?:-[A-F0-9]{4}){3}-(?:[A-F0-9]{12})\\b");
			return rGx.exec(value) != null;
		},

		new: function()
		{
			if (arguments.length == 1 && this.is_valid(arguments[0]))
			{
				$(this).data("value", arguments[0]);
				value = arguments[0];
				return value;
			}

			var res = [], hv;
			var rgx = new RegExp("[2345]");
			for (var i = 0; i < 8; i++)
			{
				hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
				if (rgx.exec(i.toString()) != null)
				{
					if (i == 3) { hv = "6" + hv.substr(1, 3); }
					res.push("-");
				}
				res.push(hv.toUpperCase());
			}
			value = res.join('');
			$(this).data("value", value);
			return value;
		},

		value: function()
		{
			if ($(this).data("value"))
			{
				return $(this).data("value");
			}
			var val = this.new();
			$(this).data("value", val);
			return val;
		}
	}
})();