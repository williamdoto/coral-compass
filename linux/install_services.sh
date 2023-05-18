#!/usr/bin/bash
# Get the full path of the directory this script is in. Based on https://stackoverflow.com/a/246128
script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
coral_dir=$(dirname "$script_dir")

echo "Coral Compass is installed ar the following location:"
echo "$coral_dir"
echo ""

# Copy the coral compass service and install it.
copy_install_service () {
    # Replace the placeholders with the paths and users for this system.
    local service_name=$1
    local user=$(whoami)
    local service_path="/etc/systemd/system"
    echo "Installing $service_name"
    sed 's|<CORAL_COMPASS_DIR>|'$coral_dir'|g;s|<CORAL_COMPASS_USER>|'$user'|g' "$coral_dir/linux/$service_name" | sudo tee "$service_path/$service_name" > /dev/null

    # Install, enable and start the service
    echo "  - Enabling"
    sudo systemctl enable $service_name
    echo "  - Starting"
    sudo systemctl start $service_name
    echo ""
}

copy_install_service "coral-reef-monitor.service"
copy_install_service "iptables-restore.service"

echo "Done"