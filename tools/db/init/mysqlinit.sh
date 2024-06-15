	#!/bin/bash
    
	echo "Granting privileges..."
	mysql -uroot -p"qwer1234" -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
	mysql -uroot -p"qwer1234" -e "FLUSH PRIVILEGES;"
	echo "All done."