} catch (error: any) {
  console.error('Error fetching images:', error)

  return NextResponse.json(
    {
      error: 'Error al obtener las imágenes',
      message: error?.message ?? String(error),
      code: error?.code,
    },
    { status: 500 }
  )
}
