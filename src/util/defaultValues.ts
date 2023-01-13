const getRandomAvatar = (name: string): string => {
  return (
    'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
  )
}

export { getRandomAvatar }
