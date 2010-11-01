#!/bin/bash

pybabel extract -F po/babel.cfg . -o po/osmstats.pot \
	--msgid-bugs-address=d.paleino@gmail.com \
	--copyright-holder='David Paleino <d.paleino@gmail.com>' \

sed -i "s/PROJECT/osmstats/g" po/osmstats.pot
sed -i "s/VERSION/0.1/g" po/osmstats.pot

echo -n '<p class="langs">' > views/l10n.tmpl

for trans in $(ls po/*.po); do
	msgmerge --update $trans po/osmstats.pot
	name=$(basename $trans .po)
	[ -d po/locales/$name/LC_MESSAGES ] || mkdir -p po/locales/$name/LC_MESSAGES
	msgfmt $trans -o po/locales/$name/LC_MESSAGES/messages.mo

	lang=$(cat $trans | grep Team | sed -e 's/"Language-Team: \(.*\)\\n"/\1/')
	echo -n "<a href=\"/lang/${name}\">" >> views/l10n.tmpl
	echo -n "<abbr title=\"${lang}\">${name}</abbr>" >> views/l10n.tmpl
	echo -n '</a> ' >> views/l10n.tmpl
done

echo '</p>' >> views/l10n.tmpl

msgen po/osmstats.pot | msgmerge --update po/en.po -
msgfmt po/en.po -o po/locales/en/LC_MESSAGES/messages.mo
