echo "Killing zombie phantomjs processes..."
ps -ef | grep "bin/phantomjs" \
  | grep "capture.js" \
  | grep -oEi ' * [1-90]{5}' \
  | while read pid ; do kill -9 "$pid" \
  ; done
echo "Done!"